const getSavedAccounts = () =>
{
    const accountsJSON = localStorage.getItem('accounts')
    try
    {
        return accountsJSON ? JSON.parse(accountsJSON) : []
    }
    catch (event)
    {
        return []
    }     
}

let accounts = getSavedAccounts()


function signOut(){
    location.assign(`indexWithNoUser.html`)
}

let flagOfMarkerButton=0

function addFireMarkerOnMap()
{ 
    
    if(flagOfMarkerButton == 0)   
    { 
        flagOfMarkerButton = 1;
        isAddPointClicked = true
        const userId = location.hash.substring(1)
        putSavedCoordinateOnMapUsingId(userId)
        map.on('click', onClickToAddMarker)
    }
    else
    {
        
        flagOfMarkerButton = 0;
        removeMarkers();
        map.off('click', onClickToAddMarker);
        
    }
    
}

function onClickToAddMarker(ev)
{
    
    const userId = location.hash.substring(1)
    var latlng = map.mouseEventToLatLng(ev.originalEvent);
    var newMarker = new L.marker(latlng).addTo(map).on('click', onMarkerClick);
    const user = accounts.find(element => element.id===userId)
    newMarker.bindPopup(`Reported By: ${user.userName}`)
    newMarker.on('mouseover', function (e) {
        this.openPopup();
    });
    newMarker.on('mouseout', function (e) {
        this.closePopup();
    })
    user.newCoordinates.push(latlng)
    saveAccounts(accounts)
}

function putSavedCoordinateOnMapUsingId(userId)
{  
        
        const user = accounts.find(element => element.id===userId)
        user.newCoordinates.forEach(element =>{
            var newMarker = new L.marker(element).on('click', onMarkerClick).addTo(map);
            newMarker.bindPopup(`Reported By: ${user.userName}`)
            newMarker.on('mouseover', function (e) {
                this.openPopup();
            });
            newMarker.on('mouseout', function (e) {
                this.closePopup();
            })
        })
  
}
function showNewFireCoordinates()
{
    accounts.forEach(element => {
        putSavedCoordinateOnMapUsingId(element.id)
    });
}

function onMarkerClick(e)
{
    const userId = location.hash.substring(1)
    const user = accounts.find(element => element.id===userId)
    const coordi = e.latlng
    accounts.forEach(element => {
        for(let i = element.newCoordinates.length - 1; i >= 0; i--) 
        { 
            if (element.newCoordinates[i].lng == coordi.lng && element.newCoordinates[i].lat == coordi.lat ) { 
                element.newCoordinates.splice(i, 1);
                saveAccounts(accounts)
                L.marker(e).remove()
                removeMarkers()
                putSavedCoordinateOnMapUsingId(element.id)
                
                
            }

            if (user.admin === true)
            {
                removeMarkers()
                showNewFireCoordinates()
            }
        }
    });
}
function removeMarkers()
{
    map.eachLayer((layer) => {
         if(layer['_latlng']!=undefined)
            layer.remove();
     });
     
    
}




const saveAccounts = (accounts) =>
{
    localStorage.setItem('accounts', JSON.stringify(accounts))
}
