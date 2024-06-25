lsof -i:3000|awk '{print $2}'|xargs kill -9 
nohup yarn start & disown
