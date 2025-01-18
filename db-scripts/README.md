# Init Database Instance & Creating Tables

## Create MYSQL Instance

```
docker run -d --name mysql  --privileged=true -e MYSQL_ROOT_PASSWORD="ead8686ba57479778a76e"  -e MYSQL_USER="demo" -e MYSQL_PASSWORD="19e5a718a54a9fe0559dfbce6908" -e MYSQL_DATABASE="demo"  -p 3309:3306 bitnami/mysql:8.0
```

## Create Tables

- `ecom.sql`