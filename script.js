//Deklarasi Variabel

let listName = document.getElementById("list-name");
let btnSave = document.getElementById("btn-save");
let list_item = [];
let listHTML = "";

// Menyimpan Data / Item

btnSave.addEventListener("click", function () {
  if (listName.value === "") {
    alert("Nama Harus diisi! Tidak Boleh Kosong!!!");
  } else {
    let listContainer = document.querySelector(".list-group");
    let listItemHTML = `<li class="list-group-item d-flex justify-content-between">
                        <span>${listName.value}</span>
                        <button class="badge border-0 bg-danger btn-hapus">X</button></li>`;

    listHTML += listItemHTML;

    // Menambahkan Item Baru Ke Local Storage
    manageLocalStorage("TAMBAH", listName.value);

    listContainer.innerHTML = listHTML;
    listName.value = "";
    listName.focus();

    // Menghapus Item
    let btnHapus = document.querySelectorAll(".btn-hapus");
    for (let x = 0; x < btnHapus.length; x++) {
      let hapus = btnHapus[x];
      hapus.addEventListener("click", function () {
        let itemText = hapus.parentElement.querySelector("span").textContent;
        hapus.parentElement.remove();
        manageLocalStorage("HAPUS", itemText); // Menghapus data berdasarkan teks item
      });
    }
  }
});

// Local Storage

if (localStorage.getItem("TO_DO_ITEMS")) {
  let itemLocalStorage = JSON.parse(localStorage.getItem("TO_DO_ITEMS"));

  itemLocalStorage.forEach(function (itemTodo) {
    let listItemHTML = `<li class="list-group-item d-flex justify-content-between">
                        <span>${itemTodo}</span>
                        <button class="badge border-0 bg-danger btn-hapus">X</button></li>`;

    listHTML += listItemHTML;

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
        return todoItem !== item;
      });
      break;
  }

  localStorage.setItem("TO_DO_ITEMS", JSON.stringify(list_item));
}

// Kode untuk memperbarui daftar item setelah halaman dimuat
window.addEventListener("load", function () {
  list_item = JSON.parse(localStorage.getItem("TO_DO_ITEMS")) || [];
  listHTML = "";

  list_item.forEach(function (itemTodo) {
    let listItemHTML = `<li class="list-group-item d-flex justify-content-between">
                        <span>${itemTodo}</span>
                        <button class="badge border-0 bg-danger btn-hapus">X</button></li>`;

    listHTML += listItemHTML;
  });

  let listContainer = document.querySelector(".list-group");
  listContainer.innerHTML = listHTML;

  let btnHapus = document.querySelectorAll(".btn-hapus");
  for (let x = 0; x < btnHapus.length; x++) {
    let hapus = btnHapus[x];
    hapus.addEventListener("click", function () {
      let itemText = hapus.parentElement.querySelector("span").textContent;
      hapus.parentElement.remove();
      manageLocalStorage("HAPUS", itemText); // Menghapus data berdasarkan teks item
    });
  }
});
