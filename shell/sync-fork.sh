set -ex

pets=$(jq .data json/organizations.json)
length=$(jq '.data|length' json/organizations.json)
lengthA=`expr $length - 1`

for index in `seq 0 $lengthA`
  do
    repo=`echo ${pets} | jq -r ".[${index}].fullName"`
    mkdir snap
    cd snap
    git config --global user.email "xrkffgg@163.com"
    git config --global user.name "zoo-js-bot"
    git clone git@github.com:$repo/zoo.git
    cd zoo
    git remote add zoo git@github.com:zoo-js/zoo.git
    git fetch zoo
    git rebase zoo/main
    git push -f
    cd ../../
    rm -rf snap

done
