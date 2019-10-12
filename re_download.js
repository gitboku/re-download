const makeDeleteButtonString = (index) => {
  return `<td id='del-${index}'><button type='button'>×</button></td>`
}

const makeLinkString = (index, value) => {
  return `<td id='td-${index}'><a href='${value}' download>${value}</a></td>`
}

const makeTable = (datas) => {
  $(document).ready(function () {
    $("#redownload-content").append($("<table>")).append($("<tbody id='redownload-table-content'>"))

    $.each(datas, (index, value) => {
      $('tbody#redownload-table-content').append($(`<tr id='row-${index}'>`)
        .append($(makeLinkString(index, value)))
        .append($(makeDeleteButtonString(index)))
      )
    })
  })
}

const makeDefault = () => {
  $('#redownload-content').append('<div>保存されたアイテムはありません。</div>')
}

const makeContents = () => {
  chrome.storage.local.get(null, (items) => {
    const len = Object.keys(items).length
    if (len == 0) {
      makeDefault()
    } else {
      makeTable(items)
    }
  })
}

document.onload = makeContents()