# git-cheat-sheet

| Description                        |   command                                                         |
| ---------------------------------- | ----------------------------------------------------------------- |
| 撤销add的某一个文件，但不删除工作站代码  | git reset file |
| 撤销add的所有文件，但不删除工作站代码   | git reset |
| 撤销commit操作 | 注：reset 命令只能回滚最新的提交，无法满足保留最后一次提交只回滚之前的某次提交。 |
| &nbsp;&nbsp;--soft 不删除工作空间的改动代码，撤销commit，不撤销add | git reset --soft HEAD^ |
| &nbsp;&nbsp;--hard 删除工作空间的代码，撤销commit且撤销add | git reset --hard HEAD^ |
| 获取所有缓存区文件名（换行的形式） | git diff --cached --name-only --diff-filter=ACM |
| 获取所有缓存区文件名（不换行，空格形式） | git diff --cached --name-only --diff-filter=ACM | tr '\n' ' ' |
