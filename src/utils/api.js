function getAllEpubs(){
    let response=await fetch('/alice.epub');
    let blob=await response.blob();;;
}