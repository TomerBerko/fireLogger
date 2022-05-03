if (accounts.length < 1)
{
accounts.push({
    id: "4f963a37-04cf-40b3-9b84-624aeb4599df",
    userName : "adminio",
    userPass : "admin",
    userEmail : "admin@gmail.com",
    admin:true,
    createdAt:1633273143591,
    newCoordinates:[]
})
accounts.push({
    id: "546bd6a1-40a8-4fe4-b2ad-3fd058a9ae0d",
    userName : "rominat",
    userPass : "12345",
    userEmail : "rominat@gmail.com",
    admin:false,
    createdAt:1634034681271,
    newCoordinates:[{lat: 31.269617456497354, lng: 34.45455061073871},{lat: 31.27681884364269, lng: 34.47106498490991}, {lat: 31.45723812809867, lng: 35.11399408165725}, {lat: 31.621098537598606, lng: 35.25685225497271}, {lat: 32.34638658698957, lng: 35.10544708598341}]
})
accounts.push({
    id: "ccd36f26-1171-4877-aa1e-915c40cc3cf9",
    userName : "asafmoni",
    userPass : "12345",
    userEmail :"asafmoni@gmail.com",
    admin:false,
    createdAt:1634034769812,
    newCoordinates:[{lat: 31.477053205682022, lng: 35.2769968029438}, {lat: 31.204938585305445, lng: 35.1973258985948}, {lat: 30.84482877717095, lng: 35.13413862962834}, {lat: 30.800014369956852, lng: 34.74402592557453}, {lat: 33.06363653607578, lng: 35.18542093903169}, {lat: 33.03140523475401, lng: 35.188168211595446} , {lat: 33.03601042853919, lng: 35.22937730005186}]
})
accounts.push({
    id: "4aae24fd4-6dc7-4e0b-929f-33b5daec1836",
    userName : "avisami",
    userPass : "12345",
    userEmail : "avisami@gmail.com",
    admin:false,
    createdAt:1634034837904,
    newCoordinates:[{lat: 31.93940054572483, lng: 34.858370371395736},{lat: 31.92774594902369, lng: 34.864551734664225},{lat: 31.9324079650081, lng: 34.89133764216088},{lat: 31.9638703885642, lng: 34.88240900632863}]
})

saveAccounts(accounts)
}
