import { Component, OnInit, ViewChild, EventEmitter, Input, Output} from '@angular/core';
import { PagingControl } from 'client-model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'lib-pagination',
  templateUrl: `./pagination.component.html`,
  styles: []
})
export class PaginationComponent implements OnInit {
  public currentPage: number;
  public pageSize: number = 10;

  // pagination
  public pageDisplay: Array<number>;

  // calculated
  public totalPages: number;
  public totalResults: number;

  @Output() newRequest: EventEmitter<PagingControl> = new EventEmitter();

  // Validation for form inputs
  goToPageForm = new FormGroup({
    'goToPage': new FormControl('', [
      this.validatePageNumber.bind(this)
    ])
  });

  // Go to page validation
  checkGoToPageError(): boolean {
    var goToPage = this.goToPageForm.get('goToPage');

    if (goToPage.invalid && (goToPage.dirty || goToPage.touched)) 
    {
        return true;
    }
    else 
        return false;
  }

  // Checks if valid page
  validatePageNumber(control: AbstractControl) {
    var re = new RegExp("^[0-9]*$");

    // 'this' is undefined on page load
    if ((re.test(control.value) && control.value <= this.totalPages && control.value > 0|| 
        control.value === "" || 
        control.value === null)) {
      // No error
      return null;
    }
    else {
      // Error
      return { validPage: true };
    }
  }

  // Set page size
  changePageSize(newPageSize: number) {
    // go back to the first page
    this.currentPage = 1;

    // set page size to the value of the drop down
    this.pageSize = newPageSize;
    var pagingControl = new PagingControl(1, this.pageSize);

    // change the total pages
    this.totalPages = Math.ceil(this.totalResults / this.pageSize);
    this.updatePageDisplay();
  }

  updatePaging(totalResults: number) {
    this.totalResults = totalResults;
    this.totalPages = Math.ceil(this.totalResults / this.pageSize);
    this.updatePageDisplay();
  }

  updatePageDisplay() {
    if (this.totalPages < 5) {
      // show only the amount of pages
      this.pageDisplay = this.createPaginationArray(1, this.totalPages);
    } else if (this.currentPage === 1 || this.currentPage === 2) {
      // show first 5 pages out of many
      this.pageDisplay = this.createPaginationArray(1, 5);
    } else if (this.currentPage === this.totalPages || this.currentPage === this.totalPages - 1) {
      // last and second last page - showing last 5 elements
      this.pageDisplay = this.createPaginationArray(this.totalPages -4, 5);
    } else {
      // show active element in the middle - if total pages are greater than 5
      this.pageDisplay = this.createPaginationArray(this.currentPage -2, 5);
    }
  }

  private createPaginationArray(startIndex: number, size: number): Array<number> {
    var pageArray = new Array<number>();
    var i: number;

    for (i = 0; i < size; i++) {
      pageArray.push(startIndex + i);
    }

    return pageArray;
  }

  page(pageNumber: number) {
    this.currentPage = pageNumber;

    var startIndex = this.currentPage;
    var paging = new PagingControl(startIndex, this.pageSize);

    this.updatePageDisplay();

    // emit a paging control
    this.newRequest.emit(paging);
  }
  
  public setCurrentPage(page: number) {
    this.currentPage = page;
  }

  backPage() {
    // need to stop going under the minimum pages
    if (this.currentPage > 1) {
      var pageNumber: number = this.currentPage - 1;
      this.page(pageNumber);
    }
  }

  nextPage() {
    // need to stop going over the maximum pages
    if (this.currentPage < this.totalPages) {
      var pageNumber: number = this.currentPage + 1;
      this.page(pageNumber);
    }
  }

  firstPage() {
    this.page(1);
  }

  lastPage() {
    this.page(this.totalPages);
  }

  goToPage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      console.log("I made it through");
      this.page(Number(pageNumber));
    }
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.currentPage = null;
    this.totalResults = null;
    this.totalPages = null;
    this.pageDisplay = null;
    this.pageSize = 10;
  }
}
