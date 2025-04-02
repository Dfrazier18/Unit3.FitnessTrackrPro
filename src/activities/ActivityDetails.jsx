import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
  const { id } = useParams();
  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${id}`, "activities");

  const { token } = useAuth();

  const {
    mutate: deleteActivity,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${id}`, ["activities"]);
  const navigate = useNavigate();

  const waitForDelete = async () => {
    await deleteActivity();
    navigate("/activities");
  };

  if (loading || !activity) return <p>Loading activity details...</p>;
  if (error) return <p>oops!...</p>;
  if (deleteLoading) return <p>Deleting activity...</p>;
  if (deleteError) return <p>oops!...It did not delete</p>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>Created by:{activity.creatorName}</p>
      <p>{activity.description}</p>
      {token && (
        <button onClick={() => waitForDelete()}>Delete Activity</button>
      )}
    </div>
  );
}
