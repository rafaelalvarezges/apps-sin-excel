import cx_Oracle as ora
import pymongo as pym

def conectar_oracle():
    dsn_tns = ora.makedsn('opclnxdbprod01.subnet150.gesvcn.oraclevcn.com',1521,service_name='dwhpdb.subnet150.gesvcn.oraclevcn.com')
    conn = ora.connect('dataw','dataw',dsn_tns)
    cur = conn.cursor()
    return conn, cur

def conectar_mongo():
    host = '10.132.0.3'
    user = 'ges'
    pwd = 'electro.01'
    db = 'apps_sin_excel'
    
    client = pym.MongoClient(host=host, username=user, password=pwd, authSource=db)
    dbase = client[db]
    return dbase