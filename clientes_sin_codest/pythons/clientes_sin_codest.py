from resources import conectar_mongo, conectar_oracle
import pymongo

def carga_datos():

    col = 'clientes_sin_codest'
    db = conectar_mongo()
    collect = db[col]
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

    str_select = '''
        Select pdv, codcli, numidc, nombre, cadena, codest, nomext, nomdrv, venta_anio_anterior, venta_anio_actual
            from v_clientes_sin_codest
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