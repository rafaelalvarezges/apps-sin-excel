from resources import conectar_mongo, conectar_oracle
import pymongo

def carga_datos():

    col = 'clientes_sin_codest'
    db = conectar_mongo()
    collect = db[col]
    collect.delete_many({})
    i = 1

    dict_mongo = {'_id':0, 
                    'pdv':'', 
                    'codcli':0, 
                    'global':0,
                    'nombre':'',
                    'cadena':'', 
                    'codest':'',
                    'nomext':'',
                    'nomdrv':'',
                    'vta_anio_ant':0.0, 
                    'vta_anio_actual':0.0
                }

    # str_select = '''
    #     Select pdv, codcli, numidc, nombre, cadena, codest, nomext, nomdrv, venta_anio_anterior, venta_anio_actual
    #         from v_clientes_sin_codest
    # '''
    str_select = '''
        select * from 
        (select  rac.pdv pdv, 
                cli.codcli, 
                rac.idc numidc, 
                rac.nomcli nombre,
                rac.cad cadena,
                cli.codest codest, 
                rac.nomext ce,
                rac.nomdrv drv,
                sum(case when to_char(to_date(sls.anymes,'YYYYMM'),'YYYY') = to_char(add_months(sysdate,-13),'yyyy') then sls.imp_vta else 0 end) Venta_ant,
                sum(case when to_char(to_date(sls.anymes,'YYYYMM'),'YYYY') = to_char(add_months(sysdate,-1),'yyyy') then sls.imp_vta else 0 end) Venta_act
        from RAC_COL_PRF_C@DWH rac, 
            clientes cli,  
            v_resumen_asignaciones@dwh ra,   
            sf_sls_50@DWH sls
        where rac.idc = cli.numidc
            and (
                (substr(rac.cliente,5) = to_char(cli.codcli))
                or
                (instr(rac.cliente,'.',5) > 0 and  substr(rac.cliente,5,instr(rac.cliente,'.',5)-5) = to_char(cli.codcli) ) --algunos clientes tienen concatenado al final .30 (sucursal)
                )
            and rac.pdv = cli.codemp
            and ra.codemp(+) = cli.codemp
            and ra.codcli(+) = cli.codcli
            and fsociedad(rac.pdv) != '852'
            and rac.pdv not in ('851','200','199','012')
            and estado != 0
            and cli.codest is null
            and cli.codemp = sls.codemp
            and cli.codcli = sls.codcli
        group by rac.pdv,cli.codcli,rac.idc, rac.nomcli, rac.cad, cli.codest, rac.nomext, rac.nomdrv
        order by pdv, codcli
        ) where nvl(venta_ant,0)+nvl(venta_act,0)>0
    '''

    _, cur = conectar_oracle()
    cur.execute(str_select)
    regs = cur.fetchall()
    for r in regs:
        dict_regs = dict_mongo.copy()
        dict_regs["_id"]                = r[0]+'.'+str(r[1])
        dict_regs["pdv"]                = r[0]
        dict_regs["codcli"]             = r[1]
        dict_regs["global"]             = r[2]
        dict_regs["nombre"]             = r[3]
        dict_regs["cadena"]             = r[4]
        dict_regs["codest"]             = r[5]
        dict_regs["nomext"]             = r[6]
        dict_regs["nomdrv"]             = r[7]
        dict_regs["vta_anio_ant"]       = r[8]
        dict_regs["vta_anio_actual"]    = r[9]

        if(i%100==0):
            print("Llevamos %d registros tratados" %i)
        i+=1

        try:
            collect.insert_one(dict_regs)
        except pymongo.errors.DuplicateKeyError:
            '''Puesto que la clave primaria del registro en mongo es pdv.codcli, en caso de que intentemos
               subir registros que ya existiesen anteriormente, simplemente no los trataríamos.'''

    print("Total de Registros: %d" %(i-1))

                





if __name__ == "__main__":
    carga_datos()    
