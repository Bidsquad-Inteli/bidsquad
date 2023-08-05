# Command to start backend:
ls *.py ./core/*.py | ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004" NETWORK='localhost' entr -r python3 bidsquad.py 

# Frontend console commands:

## Create a new auction:
yarn start input send --payload '{
    "method": "create",
    "args": {
        "carbonCredit": 90, 
        "satteliteImageUrl": "ips.placeholder",
        "title": "Default title for testing",
        "description": "Default description for testing",
        "start_date": '1691269244',
        "end_date": '1691528957'
    }
}'

## List auctions:
yarn start inspect --payload "auctions"

## Get auction info:
yarn start inspect --payload "auctions/0"

## Create a new bid:
yarn start input send --accountIndex 2 --payload '{    "method": "bid",
    "args": {
        "amount": 4,
        "auction_id": 0
    }
}'

## List bids for an auction:
yarn start inspect --payload "auctions/0/bids"