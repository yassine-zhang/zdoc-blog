# Linux server security configuration

测试所用Linux: Centos7，以此为基准。

## firewalld防火墙基本设置

1. 安装firewalld&开机自启防火墙

```shell
yum install firewalld  # 安装firewalld

systemctl start firewalld  # 启动防火墙

systemctl enable firewalld # 设置开机自启动
```

2. 常见查询

```shell
firewall-cmd --zone=public --list-services # 查看public区域内的开放服务列表(为什么这么确定是开放服务待会再看)
> dhcpv6-client ssh

firewall-cmd --get-active-zones # 获取所有活跃的区域，（如果服务器有安装docker，firewalld会默认识别并添加）
> docker
>   interfaces: docker0
> public
>   interfaces: eth0

firewall-cmd --list-all  # 默认zone为public，获取区域配置信息
firewall-cmd --list-all --zone=docker
```

::: details 什么是services?都有哪些？
在firewalld中，services是用来表示特定的应用程序或服务的网络需求。每个service定义了一组端口和协议，以及与之关联的防火墙规则。例如，http、ssh、ftp 等都是常见的服务名称。

以下是一些 Firewalld 中预定义的常见服务示例：

- dhcpv6-client：DHCPv6 客户端
- http：HTTP 服务
- https：HTTPS 服务
- smtp：SMTP 服务
- ssh：SSH 服务
- ftp：FTP 服务
- dhcp：DHCP 服务

下面是所有可以设置的服务名称，通过`firewall-cmd --get-services`查询：

RH-Satellite-6 RH-Satellite-6-capsule amanda-client amanda-k5-client amqp amqps apcupsd audit bacula bacula-client bgp bitcoin bitcoin-rpc bitcoin-testnet bitcoin-testnet-rpc ceph ceph-mon cfengine condor-collector ctdb dhcp dhcpv6 dhcpv6-client distcc dns docker-registry docker-swarm dropbox-lansync elasticsearch etcd-client etcd-server finger freeipa-ldap freeipa-ldaps freeipa-replication freeipa-trust ftp ganglia-client ganglia-master git gre high-availability http https imap imaps ipp ipp-client ipsec irc ircs iscsi-target isns jenkins kadmin kerberos kibana klogin kpasswd kprop kshell ldap ldaps libvirt libvirt-tls lightning-network llmnr managesieve matrix mdns minidlna mongodb mosh mountd mqtt mqtt-tls ms-wbt mssql murmur mysql nfs nfs3 nmea-0183 nrpe ntp nut openvpn ovirt-imageio ovirt-storageconsole ovirt-vmconsole plex pmcd pmproxy pmwebapi pmwebapis pop3 pop3s postgresql privoxy proxy-dhcp ptp pulseaudio puppetmaster quassel radius redis rpc-bind rsh rsyncd rtsp salt-master samba samba-client samba-dc sane sip sips slp smtp smtp-submission smtps snmp snmptrap spideroak-lansync squid ssh steam-streaming svdrp svn syncthing syncthing-gui synergy syslog syslog-tls telnet tftp tftp-client tinc tor-socks transmission-client upnp-client vdsm vnc-server wbem-http wbem-https wsman wsmans xdmcp xmpp-bosh xmpp-client xmpp-local xmpp-server zabbix-agent zabbix-server
:::

3. 永久禁用ICMP ping请求
   永久禁止所有 ICMP ping 请求，包括回显请求（ping）和其他类型的 ICMP 请求。假设你希望禁止公共区域的 ICMP ping 请求，可以运行以下命令：

```shell
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" protocol value="icmp" drop'  # 这条命令将添加一个规则，以阻止 IPv4 协议的 ICMP 请求。

firewall-cmd --reload # 因为配置的是永久命令所以必须要重新加载才能生效
```

- permenent参数可以简写为per
