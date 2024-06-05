docker run \
   --name mysql2 \
   -e MYSQL_ROOT_PASSWORD=strong_password \
   -p 3306:3306 \
   -v /home/abdoulaye/Code/arqam/mysql-data:/var/lib/mysql \
   -d mysql