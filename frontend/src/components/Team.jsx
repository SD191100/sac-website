/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';

const Team = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const getTeam = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/member');
                setTeam(res.data.members);
                console.log(res.data.message);
                console.log(res.data.members);
            }
            catch (error) {
                console.log(error);
            }
        }
        getTeam();
    }, []);
    return (
        <>
            <TeamInfo />
            <hr />
            <div>
                {team.map((member) => {
                    return (
                        <Member key={member._id} member={member} />
                    )
                })}
            </div>
        </>
    );
}


const Member = ({ member }) => {
    return (
        <>
            <div>
                <img src={member.memberImageLink} />
                <h3>{member.memberName}</h3>
                <h4>{member.memberPost}</h4>
                <button >View Profile</button>
            </div>
        </>
    );
}


const TeamInfo = () => {
    return (
        <>
            <div>
                <h1>Our Team</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem earum id aspernatur deserunt dolor! Eaque assumenda libero culpa nemo dolorum repellat delectus amet consequatur voluptatem id earum, nihil beatae molestias debitis cumque qui explicabo consequuntur velit enim facilis deleniti veritatis praesentium! Vel est quaerat minus tenetur incidunt nulla unde. Molestiae perferendis culpa neque deserunt nam quas autem quaerat consequatur similique quis ratione, recusandae est voluptatem quasi error? Totam ut esse quibusdam asperiores, odit deleniti nisi saepe aut, sint enim dignissimos ex at a autem tempora laudantium ipsa eveniet animi harum temporibus fuga architecto reiciendis laboriosam fugit. Nesciunt, neque rerum odio pariatur corporis, amet repudiandae a illo necessitatibus itaque fugit cupiditate officiis? Aut nostrum architecto iste beatae voluptates, dolorum dolorem vitae molestiae, recusandae explicabo, impedit alias. Illum labore exercitationem perspiciatis animi laudantium asperiores dolores voluptate? Ipsam, mollitia doloremque quisquam voluptatem atque iste. Laboriosam, neque repellendus esse vel veniam sapiente amet. Temporibus odio perferendis ducimus quo recusandae. Ab recusandae sequi similique, accusamus qui sed impedit aperiam inventore, cupiditate quibusdam labore dolorem eligendi. Accusantium, sed libero? Saepe esse sed architecto aperiam temporibus modi fugiat neque in quisquam quia veritatis placeat dicta, quae iure. Nam quo accusamus voluptatibus eaque harum iure eum possimus odio? Quisquam, voluptatum. Quisquam, voluptatum.</p>
            </div>
        </>
    );
}

export default Team;
// Enjoy Coding