uwsgi支持多种协议
http协议
uwsgi --http :9090 --wsgi-file foobar.py --master --processes 4 --threads 2
uwsgi协议
uwsgi --socket :9090 --wsgi-file foobar.py --master --processes 4 --threads 2

nginx支持uwsgi协议
include uwsgi_params


--callable不能写函数？