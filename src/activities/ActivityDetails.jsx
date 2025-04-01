import { useParams } from "react-router";
import useQuery from "../api/useQuery";

export default function ActivityDetails() {
  const { id } = useParams();
  const { data: activity, loading, error } = useQuery(`/activities/${id}`);

  if (loading) return <p>Loading activity details...</p>;
  if (error || !activity) return <p>oops!...</p>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>Created by:{activity.creatorId}</p>
      <p>{activity.description}</p>
    </div>
  );
}
