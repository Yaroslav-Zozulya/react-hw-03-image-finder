export const Searchbar = ({ onSubmit }) => {
  return (
    <header>
      <form onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
