# Last execution time: 2020.11.16

exit

# 已作废，由于起初使用 Actions，导致 fork 工作都在跑 Actions，之后导致权限问题。计划更改为 api 形式。
# ./script/update-fork.js

set -ex

pets=$(jq .data json/organizations.json)
length=$(jq '.data|length' json/organizations.json)
lengthA=`expr $length - 1`

rm -rf snap

for index in `seq 0 $lengthA`
  do
    repo=`echo ${pets} | jq -r ".[${index}].fullName"`
    mkdir snap
    cd snap
    git clone git@github.com:$repo/zoo.git
    cd zoo
    git config user.email "xrkffgg@163.com"
    git config user.name "zoo-js-bot"
    git remote add zoo git@github.com:zoo-js/zoo.git
    git fetch zoo
    git reset --hard zoo/main
    git push -f origin main:main
    cd ../../
    rm -rf snap

done
