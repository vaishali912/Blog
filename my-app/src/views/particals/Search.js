import React from 'react'

export default function Search() {
  return (
    <>
    <div class = "searchBar">
    <div class = "contanier">
      <form action ="/search" class="search_form" role="search" method = "POST">
        <input type = "search"
        aria-label = "Search"
        id="searchInput"
        name="searchTeam"
        placeholder="Search the  site..."
      />
      </form>
      <div id ="searchClose">close</div>
    </div>
</div></>
  )
}

