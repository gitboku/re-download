const makeTable = (datas) => {
  $(document).ready(function () {
    $("#content").append($("<table>")).append($("<tbody id='table-content'>"))

    $.each(datas, (index, value) => {
      $('tbody').append($(`<tr id='row-${index}'>`)
        .append($(`<td id='td-${index}'>`).text(value))
      )
    })
  })
}

const makeDefault = () => {
  $('#content').append('<div>保存されたアイテムはありません。</div>')
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