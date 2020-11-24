# Last execution time: 2020.11.16

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
