interface UserCardProp {
  name: string;
  age: number;
  username: string;
  work: string;
  image: string;
}

const UserCard = ({ name, age, username, work, image }: UserCardProp) => {
  return (
    <div className="m-4 px-8 py-6 bg-slate-800 rounded-xl text-white flex flex-col-reverse md:flex-row gap-5 md:gap-0 items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-xl">{name}</h1>
        <p className="text-gray-400">@{username}</p>
        <p className="text-sm">Age: {age}</p>
        <p className="text-gray-200 mt-4">{work}</p>
      </div>
      <img src={image} className="w-1/2" />
    </div>
  );
};

export default UserCard;
