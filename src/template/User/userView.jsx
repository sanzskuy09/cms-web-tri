import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, addUser } from "../../redux/action/userSlice";

import {
  toastFailed,
  toastSuccess,
  toastInfo,
  toastPending,
} from "@/utils/Toastify";

export default function UserView() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // console.log(count);

  return (
    <div>
      <div>
        <button onClick={() => toastInfo(`Sign in Info`)}>Notify info!</button>
        <button onClick={() => toastSuccess(`Sign in Success`)}>
          Notify success!
        </button>
        <button onClick={() => toastFailed(`Sign in Failed`)}>
          Notify failed!
        </button>
        <button
          onClick={() => toastPending(`Waiting Action..`, `Success Get Action`)}
        >
          Notify Pending!
        </button>
      </div>
      <button
        aria-label="Add Value"
        onClick={() => dispatch(addUser({ name: "ihsan" }))}
      >
        Add Value
      </button>
      <h2>List User :</h2>
      <p>{user.loading && "Loading"}</p>
      <p>{!user.loading && user.error ? `Error: ${user.error}` : null}</p>
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map((e, i) => (
            <li key={i}>{e.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
