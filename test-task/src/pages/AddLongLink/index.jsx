import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./AddLongLink.module.scss";
import { useDispatch,useSelector} from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchLink } from "../../redux/slices/links";
import { Navigate } from "react-router-dom";

export const AddLongLink = () => {

  const [text, setText] = React.useState("");

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {

    e.preventDefault();

    const response = await dispatch(fetchLink(text));

    setText("");
    
    if (!response.payload) {
      return alert("Не удалось конвертировать ссылку");
    }
    return alert("Сокращенная ссылка получена");
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30,maxWidth:'800px' }}>
      <br />
      <TextField
       style={{marginBottom:'30px',minWidth:'500px'}}
        size="small"
        variant="standard"
        placeholder="Вставьте ссылку..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="small" variant="contained">
          Конвертировать
        </Button>
        <a href="/">
          <Button size="small">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
