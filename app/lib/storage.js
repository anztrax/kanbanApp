export default {
  get : function(k){
    try {
      return JSON.parse(localstorage.getItem(k));
    }catch(e){
      return null;
    }
  },
  set : function(k,v){
    localStorage.setItem(k,JSON.stringify(v));
  }
}