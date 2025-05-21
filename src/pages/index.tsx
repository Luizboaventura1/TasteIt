import type { RootState } from "@/store";
import { setUsername } from "@/store/userReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  
  const changeName = () => {
    dispatch(setUsername("Luiz Henrique"));
  };

  return (
    <div>
      <h1>Home page</h1>
      <p>
        Name:{" "}
        {useSelector((state: RootState) =>
          state?.user?.name ? state.user.name : "Undefined name"
        )}
      </p>
      <button onClick={changeName}>Change name</button>
    </div>
  );
}
