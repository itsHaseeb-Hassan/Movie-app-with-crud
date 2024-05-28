import React from "react";
import List from "../../component/listgroup/List";
import MovieTable from "../../component/table/Table";

export default function Home() {
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-3">
            <List />
          </div>
          <div className="col-sm-9">
            <MovieTable />
          </div>
        </div>
      </div>
    </div>
  );
}
