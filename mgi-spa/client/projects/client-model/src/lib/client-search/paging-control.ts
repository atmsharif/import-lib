export class PagingControl {

    constructor(startIndex: number, pageSize: number) {
      this.startIndex = startIndex;
      this.pageSize = pageSize;
    }
  
    startIndex: number;
    pageSize: number;
    
  }