# git-cheat-sheet

| Description                        |   Syntax&Error                                                    |
| ---------------------------------- | ----------------------------------------------------------------- |
| 撤销add的某一个文件，但不删除工作站代码  | git reset file |
| 撤销add的所有文件，但不删除工作站代码   | git reset |
| 撤销commit操作 | 注：reset 命令只能回滚最新的提交，无法满足保留最后一次提交只回滚之前的某次提交。 |
| &nbsp;&nbsp;--soft 不删除工作空间的改动代码，撤销commit，不撤销add | git reset --soft HEAD^ |
| &nbsp;&nbsp;--hard 删除工作空间的代码，撤销commit且撤销add | git reset --hard HEAD^ |
| 获取所有缓存区文件名（换行的形式） | git diff --cached --name-only --diff-filter=ACM |
| 获取所有缓存区文件名（不换行，空格形式） | git diff --cached --name-only --diff-filter=ACM | tr '\n' ' ' |
| 重命名文件夹（如果不使用git命令来重命名那么推送后远程仓库会继续保留原文件夹） | git mv <旧文件夹名> <新文件夹名> |
| 删除 Git 仓库中的文件夹（-r选项表示递归删除目录及其子目录下的所有文件） | git rm -r folder-name |
| 从 Git 的提交历史中删除指定文件（此处为 `./template/.DS_Store`），并将修改后的提交历史推送到远程仓库。 | git filter-branch --index-filter 'git rm --cached --ignore-unmatch ./template/.DS_Store' --prune-empty -- --all |
| 右边这个错误提示表示在 refs/original/ 目录下已经存在一个以前的备份，而新的备份无法创建。可能是之前已经运行过类似的 git filter-branch 命令，并且备份文件还未被删除。解决问题请看下一条 | <span style="color:#e46b59;">Proceeding with filter-branch...<br><br>Cannot create a new backup.<br>A previous backup already exists in refs/original/</span> |
| 为了解决这个问题，你可以尝试删除 refs/original/ 目录并重新运行 git filter-branch 命令。请注意，在删除目录之前，确保备份文件不再需要，确保当前没有未提交的更改，以免丢失工作。 | git update-ref -d refs/original/refs/heads/&#60;branch-name&#62;<br>git update-ref -d refs/original/refs/remotes/origin/&#60;branch-name&#62; |
| 强制推送本地源码到远程仓库，origin：指定远程仓库标志，main：分区名称 | git push -f origin main |
