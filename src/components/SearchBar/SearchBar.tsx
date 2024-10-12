import { Formik, Form, Field,FormikHelpers } from "formik"
import iziToast from "izitoast";
import css from './SearchBar.module.css'
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
  search: string;
};
const SearchBar = ({ sendQuery, setData, setPage }:SearchBarProps) => {
  const INITIAL_VALUES = {
    search: "",
  };
  
  const handleSubmit = (
    values: handleSubmitProps,
    actions: FormikHelpers<handleSubmitProps>
  ) => {
    if (values.search.trim() === "") {
      iziToast.error({ message: "You need enter text for searching images" });
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
