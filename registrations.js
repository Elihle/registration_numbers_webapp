module.exports = function Registrations(stored) {
    var reg = '';
    var regStored = {};
  
    if (stored) {
      for (var i = 0; i < stored.length; i++) {
        regStoredIndex = stored[i]
        regStored[regStoredIndex] = 0
      }
    }
  
    function allFromTown(regNum) {
      if (regStored[regNum] === undefined &&
        (regNum.startsWith('CA ') || regNum.startsWith('CL ') ||
          regNum.startsWith('CK ') || regNum.startsWith('CAW '))) {
        regStored[regNum] = 0;
        reg = regNum;
        return true;
      }
      return false;
    }
  
    function getReg() {
      return reg;
    }
  
    function getRegsMap() {
      return Object.keys(regStored);
    }
  
    function filterAllTown(town) {
      var allTowns = Object.keys(regStored);
      if (town === 'all') {
        return allTowns;
      }
  
      var result = allTowns.filter(function(current) {
        return current.startsWith(town);
      })
      return result;
    }
  
    return {
      fromATown: allFromTown,
      getReg,
      regsMap: getRegsMap,
      filterAll: filterAllTown
    }
  
  }