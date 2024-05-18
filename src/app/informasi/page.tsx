import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>Informasi</li>
        </ul>
      </div>
      <article className="prose m-auto">
        <h1>Informasi</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At odit
          beatae veniam accusantium? Optio esse itaque laboriosam voluptatibus
          odit, repellendus porro? Aut commodi velit similique laboriosam
          necessitatibus odit libero expedita debitis fuga delectus saepe ex,
          aperiam, eligendi unde iste ipsa facere hic dolore dolorum, tempore
          veniam minima officia. Ad quisquam repudiandae dolorum nam eos ut ea
          commodi nemo corporis. Consequatur dolor ex itaque quod cumque quo,
          sequi voluptates delectus ipsam. Sunt temporibus molestiae laboriosam
          blanditiis rerum laborum eligendi quas voluptatibus aut itaque neque
          aliquid dicta tempora veritatis inventore nesciunt cupiditate quo
          officia voluptate delectus facere, nulla repellendus! Rem, sed
          aliquid.
        </p>
      </article>
    </div>
  );
}
