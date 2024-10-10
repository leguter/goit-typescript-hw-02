import { Formik, Form, Field } from "formik"
import iziToast from "izitoast";
import css from './SearchBar.module.css'
const SearchBar = ({ sendQuery, setData, setPage }) => {
  const INITIAL_VALUES = {
    search: "",
  };
  const handleSubmit = (values, actions) => {
    if (values.search.trim() === "") {
      iziToast.error("You need enter text for searching images");
      return;
    }
    setData([]);
    setPage(1);
    sendQuery(values.search);
    actions.resetForm();
  };
  return (
    <header className={css.container}>
      <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
        <Form>
          <Field
            type="text"
            placeholder="Search images and photos"
            name="search"
            className={css.input}
          />
          <button type="submit" className={css.btnSubmit}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};
   

export default SearchBar;
