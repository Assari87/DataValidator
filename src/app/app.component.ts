import { Component, OnInit } from '@angular/core';
import { dataModel } from './tableInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.validate();
  }
  inputC1 = undefined;
  result = undefined;

  tableInfos: dataModel[] = [];

  loadDefault() {
    this.tableInfos = [
      new dataModel(
        10,
        false,
        14,
        true,
        70
      ),
      new dataModel(
        5,
        true,
        10,
        true,
        60
      ),
      new dataModel(
        20,
        true,
        null,
        false,
        100
      ),
      new dataModel(
        null,
        false,
        5,
        false,
        50
      ),
      new dataModel(
        14,
        false,
        20,
        false,
        90
      )];
    this.validate();
  }

  tableModel: dataModel = dataModel.empty();
  invalidRecord: dataModel[];

  addData() {
    if (this.tableModel) {
      if (this.tableModel.start != null &&
        this.tableModel.end != null &&
        this.tableModel.end <= this.tableModel.start) {
        alert('End is grater than start!');
        return;
      }

      if (this.tableModel.result == null) {
        alert('Enter the result!');
        return;
      }


      this.tableInfos.push(this.tableModel)
      this.tableModel = dataModel.empty();
      this.validate();
    }
    else {
      alert('Data is wrong!')
    }
  }

  deleteItem(index: number) {
    this.tableInfos.splice(index, 1);
    this.validate();
  }

  isValid(): boolean {
    return this.tableInfos.length && !this.invalidRecord?.length;
  }

  validate() {
    this.tableInfos.sort((a, b) => a.start == null ? -1 : b.start == null ? 1 : a.start - b.start);

    let result =
      this.tableInfos.filter((item, index) => {
        if (index == 0 && item.start != null)
          return true;
        if (this.tableInfos.length - 1 == index)
          return item.end != null;

        let nextItem = this.tableInfos[index + 1];
        return item.realEnd + 1 != nextItem.realStart;
      });

    this.invalidRecord = result;
  }

  calculate() {
    let data = this.tableInfos.find(p => p.isInclusiveNumber(this.inputC1));
    this.result = data?.result ?? 'Not found';
  }
}
