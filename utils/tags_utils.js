class TagsUtils {

  idsToArr(idsStr){
    if(!idsStr || idsStr.length <= 2){
      return []
    }
    return idsStr.substr(1 , idsStr.length - 2).split('-')
  }
  
  idsToStr(idsArr){
    if (idsArr.length <= 0){
      return ''
    }
    return '-' + idsArr.join('-') + '-'
  }

  // 比较新旧
  compare(oldArr , newArr){
    let add = []
    let del = []
    let update = []
    newArr.forEach(e => {
      if (oldArr.indexOf(e) > -1){
        delete oldArr[oldArr.indexOf(e)]
        update.push(e)
      }else {
        add.push(e)
      }
    })
    
    oldArr.forEach(e => {
      if (e){
        del.push(e)
      }
    })

    return [add , del , update]
  }
}

module.exports = new TagsUtils()