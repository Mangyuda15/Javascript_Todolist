let listName = document.getElementById("list-name");
let btnSave = document.getElementById("btn-save");
let list_item = [];
listHTML = "";

// Menyimpan Data / Item
btnSave.addEventListener("click", function () {
  if (listName.value == "") {
    alert("Nama Harus diisi! Tidak Boleh Kosong!!!");
  } else {
    let listContainer = document.querySelector(".list-group");
    let listHTML = listContainer.innerHTML;
    listHTML += `<li class="list-group-item d-flex justify-content-between">
                 <span>${listName.value}</span>
                 <button class="badge border-0 bg-danger btn-hapus">X</button></li>`;

    // Menambahkan Item Baru Ke Local Storage
    manageLocalStorage("TAMBAH", listName.value);

    listContainer.innerHTML = listHTML;
    listName.value = "";
    listName.focus();

    // Penghapus Item
    let btnHapus = document.querySelectorAll(".btn-hapus");
    for (let x = 0; x < btnHapus.length; x++) {
      let hapus = btnHapus[x];
      hapus.addEventListener("click", function () {
        let itemText = hapus.parentElement.querySelector("span").textContent;
        let itemId = hapus.parentElement.dataset.itemId; // Menyimpan nilai ID item pada atribut data

        hapus.parentElement.remove();
        manageLocalStorage("HAPUS", itemId); // Menggunakan nilai ID item untuk menghapus data

        console.log("Item dihapus:", itemText);
      });
    }
  }
});

// Local Stroge

if (localStorage.getItem("TO DO ITEMS")) {
  let itemLocalStorage = JSON.parse(localStorage.getItem("TO DO ITEMS"));

  itemLocalStorage.forEach(function (itemTodo) {
    listHTML += `<li class="list-group-item d-flex justify-content-between">
                 <span>${itemTodo}</span> 
                 <button class="badge border-0 bg-danger btn-hapus">X</button></li>`;

    let listContainer = document.querySelector(".list-group");
    listContainer.innerHTML = listHTML;
  });
}
function manageLocalStorage(action, item) {
  switch (action) {
    case "TAMBAH":
      list_item.push(item);
      break;
    case "HAPUS":
      list_item = list_item.filter(function (todoItem) {
        return todoItem != item;
      });
      break;
  }

  localStorage.setItem("TO DO ITEMS", JSON.stringify(list_item));
}

// Mengatur Responsive
window.addEventListener("resize", function () {
  // Code untuk mengubah tampilan elemen-elemen HTML
});

window.addEventListener("resize", function () {
  var windowWidth = window.innerWidth;

  // Code untuk mengubah tampilan elemen-elemen HTML berdasarkan windowWidth
});

function isLocalStorageSupported() {
  try {
    const testKey = "test";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

if (isLocalStorageSupported()) {
  // Penyimpanan lokal (localStorage) didukung
  // Anda dapat menggunakan localStorage di sini
  // contoh: localStorage.setItem('key', 'value');
} else {
  // Penyimpanan lokal (localStorage) tidak didukung atau diblokir
  // Berikan pesan atau tindakan alternatif
  console.log("Penyimpanan lokal (localStorage) tidak didukung atau diblokir");
}
