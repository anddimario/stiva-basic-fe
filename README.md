Basic frontend with [Vue.js](https://vuejs.org/) for [stiva cms](https://github.com/anddimario/stiva/)

![Login page](https://github.com/anddimario/stiva-basic-fe/blob/master/screenshot/login.png)
![Users list page](https://github.com/anddimario/stiva-basic-fe/blob/master/screenshot/users.png)

### Requirements
- nodejs > 8
- [serverless](https://serverless.com/) > 1
- (optional for devs) For fe: `npm install -g webpack-dev-server`

### Run fe on localhost
```
cd staticSites/basic
npm i
npm run dev
```

### Build fe
This command build in `dist/`
```
cd client
npm run build
```

### Deploy
1. create a bucket
2. in your static frontend, build for create dist
```
export API_URL=https://myapigatewayendpoint
export SITE=mysitenameforheaderkey
npm run build
```
3. deploy
```
serverless client deploy --region YOUR_REGION --s3-bucket YOUR_BUCKET_NAME
```
**NOTE** Other info on: https://github.com/fernando-mc/serverless-finch
