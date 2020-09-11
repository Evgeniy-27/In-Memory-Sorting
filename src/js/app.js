class Sorting {
  constructor() {
    this.dataJSON = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.3,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.2,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.0,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.0,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.9,
        year: 1994,
      },
    ];
  }

  redrawDOM() {
    const doc = document.getElementById('tbody');
    doc.innerHTML = '';
    for (const item of this.dataJSON) {
      const itemTr = document.createElement('tr');
      itemTr.dataset.id = item.id;
      itemTr.dataset.title = item.title;
      itemTr.dataset.year = item.year;
      itemTr.dataset.imdb = item.imdb;
      itemTr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>
      `;
      doc.appendChild(itemTr);
    }
  }

  sortImg(columnSort, sortUpDown) {
    const arrow = document.querySelector('span');
    if (arrow) {
      const parentOldRow = arrow.parentNode;
      parentOldRow.removeChild(arrow);
    }

    const arrowUp = '\u{2193}';
    const arrowDown = '\u{2191}';
    let sortArrow;
    if (sortUpDown === 'up') {
      sortArrow = arrowDown;
    } else {
      sortArrow = arrowUp;
    }

    const titleHead = document.getElementById(`head-${columnSort}`);
    const addArrow = document.createElement('span');
    addArrow.innerText = sortArrow;
    titleHead.appendChild(addArrow);
  }

  sortList(columnType, columnSort, sortUpDown) {
    if (columnType === 'string') {
      this.sortStr(columnSort, sortUpDown);
    } else if (columnType === 'numb') {
      this.sortNum(columnSort, sortUpDown);
    }
    this.redrawDOM();
  }

  sortStr(columnSort, sortUpDown) {
    this.dataJSON.sort((a, b) => {
      if (a[columnSort] > b[columnSort]) {
        return sortUpDown === 'down' ? -1 : 1;
      }
      if (a[columnSort] < b[columnSort]) {
        return sortUpDown === 'down' ? 1 : -1;
      }
      return 0;
    });
  }

  sortNum(columnSort, sortUpDown) {
    this.dataJSON.sort((a, b) => {
      if (sortUpDown === 'down') {
        return b[columnSort] - a[columnSort];
      }
      return a[columnSort] - b[columnSort];
    });
  }

  randomImg() {
    let item = 1;
    setInterval(() => {
      switch (item) {
        case 1:
          this.sortImg('id', 'up');
          this.sortList('numb', 'id', 'up');
          break;
        case 2:
          this.sortImg('id', 'down');
          this.sortList('numb', 'id', 'down');
          break;
        case 3:
          this.sortImg('title', 'up');
          this.sortList('string', 'title', 'up');
          break;
        case 4:
          this.sortImg('title', 'down');
          this.sortList('string', 'title', 'down');
          break;
        case 5:
          this.sortImg('year', 'up');
          this.sortList('numb', 'year', 'up');
          break;
        case 6:
          this.sortImg('year', 'down');
          this.sortList('numb', 'year', 'down');
          break;
        case 7:
          this.sortImg('imdb', 'up');
          this.sortList('numb', 'imdb', 'up');
          break;
        default:
          this.sortImg('imdb', 'down');
          this.sortList('numb', 'imdb', 'down');
          item = 0;
          break;
      }
      item += 1;
    }, 2000);
  }
}

const sorting = new Sorting();
sorting.redrawDOM();
sorting.randomImg();
