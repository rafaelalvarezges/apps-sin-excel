import pymongo
import cx_Oracle as ora

def conectar_oracle():
    try:
        cifra = ora.makedsn(
                "opclnxdbprod01.subnet150.gesvcn.oraclevcn.com", "1521",
                service_name="cifrapdb.subnet150.gesvcn.oraclevcn.com")
        cifra_con = 'importador/solo@'+cifra
        conn = ora.connect(cifra_con)    
        return conn, conn.cursor()
    except: 
        raise


def conectar_mongo():
    try:
        client = pymongo.MongoClient('mongodb://ges:electro.01@10.132.0.3:27017/apps_sin_excel')
        db = client.apps_sin_excel
        col = db['clientes_sin_codest']
        return col
    except:
        raise


def traspasar(conn, cur, col):
    regs = col.find({'codest':{'$nin':['',' ',None]}})
    for r in regs:
        l_cliente = r['_id'].split('.')
        str_update = '''UPDATE CLIENTES SET CODEST = '{CODEST}' WHERE CODEMP = '{CODEMP}' AND CODCLI = {CODCLI}'''
        str_update = str_update.format(CODEST=r['codest'],CODEMP=l_cliente[0],CODCLI=l_cliente[1])
        cur.execute(str_update)
        conn.commit()


if __name__ == "__main__":
    conn, cur = conectar_oracle()
    col = conectar_mongo()
    traspasar(conn, cur, col)
