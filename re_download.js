const deleteFromStorage = (targetIndex) => {
  chrome.storage.local.remove(targetIndex, () => {
    window.location.reload()
  })
}

$(document).on('click', '.redownload-delete-button', (event) => {
  let targetIndex = event.currentTarget.dataset.index
  deleteFromStorage(targetIndex)
})

const makeDeleteButtonString = (index) => {
  return `<td><button class='redownload-delete-button' data-index='${index}' type='button'>×</button></td>`
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