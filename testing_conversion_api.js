const axios=require('axios').default
const path=require('path');
const fs=require('fs');
const request=require('request');
const https=require('https')
const formdata={}


// const form=new formdata()

// form.append('inputfile',fs.readFileSync(path.join(__dirname,'../network-security/Attacks_4.ppt')),'Attacks_4.ppt');
// form.append("conversionParameters", "{}");
// form.append("async", "true");
// form.append("outputFormat", "pdf");

var headers = {
    'X-ApplicationID': 'a09026cb-6ec0-4934-9eb3-461a3f42ca9c',
    'X-SecretKey': '39b0e867-7529-455d-bdd9-981eb9e0fc86'
};

console.log(path.join(__dirname,'../netsec/Attacks_4.ppt'));

// axios.post('https://api2.docconversionapi.com/jobs/create',{
//     formData: form,
//     rejectUnauthorized: false,
//     headers: headers,
//     encoding: 'binary'
// }).then((response)=>{
//     console.log(response.status)
// }).catch((err)=>{
//     console.log(err);
// })


var conversionRequest = request.post({
    url: 'https://api2.docconversionapi.com/jobs/create',
    formData: formdata,
    rejectUnauthorized: false,
    headers: headers,
    encoding: 'binary'
}, function (err, response) {
    
    var responseParsed = null;
    if (response.statusCode == 200) {
        responseParsed = JSON.parse(response.body);
        console.log(responseParsed.fileDownloadUrl);
        const resultFile = fs.createWriteStream('output.pdf');
        https.get(responseParsed.fileDownloadUrl, function (response) {
            response.pipe(resultFile);
        });
    }
});
// Adding all parameters to multipart form
var form = conversionRequest.form();
form.append('inputfile',fs.readFileSync(path.join(__dirname,'../network-security/Attacks_4.ppt')),'Attacks_4.ppt');
form.append("conversionParameters", "{}");
form.append("async", "false");
form.append("outputFormat", "pdf");

console.log({
    url: 'https://api2.docconversionapi.com/jobs/create',
    formData: formdata,
    rejectUnauthorized: false,
    headers: headers,
    encoding: 'binary'
})


// 

// const  cloudconvert=require('cloudconvert')('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWFjMDM2YzM2OWZlMDVjNWQ2OGQ4OTIzMmM0NjdiNTVmYWQ0OGIwYWQ0ODBlZjM2NzY2MGRmZjdmYzJhYTA4NmY2ZDFhZGYyMGNhMjQ0NDQiLCJpYXQiOjE2MjM1MDU2NTQuNDI3MjA1LCJuYmYiOjE2MjM1MDU2NTQuNDI3MjA4LCJleHAiOjQ3NzkxNzkyNTQuMzg5ODQ0LCJzdWIiOiI1MTcxNjQwMyIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.cFvQ1Ob43tjNKx3vd0-yHlWMguHfGO-eYcc8lt_5XqELkbLMc38kfbgpmVL6DeiGhcAwiQQrWzcIKRW2ZLZsKCgRRD9NwwpSvfYN-2TXytZRB6e7iz4ffGGmPbZWUVLwqKjra4zFCuQV-dPHSInerFqBqQ4gzq9pl4f5WAB6BqF9Jj6CGc1vE1O881E_aYepS5YhzltFfJl_OqMs_5fpbl-1CJvPLxlCmjAxk4n9dVdCBGdCLlJiPjzBFJxDq-Uodm_-ZNpzG2bPMfvQkAmDInNXJD98vCbVqkgAFX9KmgOMAIN9d-3qSX63YxZAXliaYYmKoUnuXj5zz0sQm5YKk17dgRlteeMWuCwpcjeXxcWZwJNK4lxinnxShqM-y3pn3hu4n68WEiRp2K_yzei3mfR2yul5G5dswYLYGbqnLncVO_nBRL66XXLRHV_3dSk0g3e0vVRF4yonHcceuhcTmo0XksI-dIcvPK3T1XOAp1ctEilNLQ59zQB8ySlUwNAVR33O_ljaM_PtAwtBQ468TRf61Q177TgKdkxPe7RZQybKxfJkMQnCBcgjKjb41dBwlAAuWae1gmBj1QpTumGkLZ2pgFTCZMFXf-x_XQpiqp1a1tJEpoDRsBVe71M0GtOBlvKuZ-Hgt1PRZHlmDzmTLH8nzagQYGKdJJnCj4w7yvk');
