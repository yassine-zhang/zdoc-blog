# centos-cheat-sheet
| Description                        |   Syntax&Error                                                    |
| ---------------------------------- | ----------------------------------------------------------------- |
| 防火墙(注意用户权限，提权sudo) | firewall-cmd |
| 检查防火墙状态 | firewall-cmd --state |
| 启动防火墙 | systemctl start firewalld |
| 停止防火墙 | systemctl stop firewalld |
| 设置开机自启动防火墙 | systemctl enable firewalld |
| 查看防火墙规则 | firewall-cmd --list-all |
| 允许特定端口/服务通过防火墙（永久生效） | firewall-cmd --permanent --add-port=&#60;port&#62;/tcp <br> firewall-cmd --permanent --add-service=&#60;service&#62; |
| 重新加载防火墙规则 | firewall-cmd --reload |
| 移除特定端口/服务的防火墙规则（永久生效） | firewall-cmd --permanent --remove-port=&#60;port&#62;/tcp <br> firewall-cmd --permanent --remove-service=&#60;service&#62; |
| 查看打开的端口 | firewall-cmd --list-ports |
| 查看允许通过的服务 | firewall-cmd --list-services |
| 请注意，对于生产环境中的服务器，建议仔细规划防火墙规则，只允许必要的端口和服务通过，并定期进行安全审查和更新。 | 以上命令中，&#60;port&#62;可以是具体的端口号，例如80或443，&#60;service&#62;可以是已知的服务名称，例如http、https等。 |
| 如果使用了Docker，当对端口进行更改后应进行重启Docker服务，以免在之后运行新容器造成不必要的麻烦 | |
| ---------- | ---------- |
| 查看剩余磁盘空间（关注/dev/vda1..2..3或/dev/sda1..2..3） | df -h |

