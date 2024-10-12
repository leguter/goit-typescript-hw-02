import { Formik, Form, Field } from "formik"
import iziToast from "izitoast";
import css from './SearchBar.module.css'
import { FormEvent } from "react";
type   ImgData=  {
    id: number;
    description: string;
    urls: {
      regular: string;
      small: string;
    };
  };
type SearchBarProps = {
  sendQuery: (values: string) => void;
  setData: (value: ImgData[]) => void;
  setPage: (value: number) => void;
};
type handleSubmitProps = {
  // values: {
  //   search: string;
  // };
  search: string;
  actions: {
    resetForm: () => void;
  };
};
const SearchBar = ({ sendQuery, setData, setPage }:SearchBarProps) => {
  const INITIAL_VALUES = {
    search: "",
  };
  
  const handleSubmit: React.FC<handleSubmitProps> = (values, actions) => {
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
