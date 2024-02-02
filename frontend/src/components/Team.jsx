/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


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
            <div style={{ margin: '0 auto', width: '80%', PaddingTop: '200px' }} >
                <TeamInfo />
                <hr style={{height: '1px', borderColor: "gray", background: 'gray'}} />
                <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '100px', marginTop: '50px', width: '100%', borderRadius: '18px', flexDirection: 'row', maxWidth: 'calc(100% - 15px)' }} >
                    {team.map((member) => {
                        return (
                            <Member key={member._id} member={member} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}


const Member = ({ member }) => {
    return (
        <>
            <Card variant={'elevation'} elevation={9} sx={{  m: '30px', maxWidth: '300px', width: '100%', }}>
                <CardActionArea>
                    <div style={{ display: "flex", justifyContent: "center" }} >
                        <img style={{ height: '200px', width: '200px', border: 'solid 1px lightgray', borderRadius: '50%', margin: '10px' }} src={member.memberImageLink} alt="" />
                    </div>
                    <CardContent>
                        <Typography textAlign={"center"} gutterBottom variant="h5" component="div">
                            {member.memberName}
                        </Typography>
                        <Typography textAlign={'center'} variant="body2" color="text.secondary">
                            {member.memberPost}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "center" }} >
                            <Button size={'small'}>View Profile</Button>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}


const TeamInfo = () => {
    return (
        <>
            <div style={{marginBottom: '50px'}} >
                <Typography style={{marginBottom: '10px'}} variant={'h4'} >Our Team</Typography>
                
            </div>
        </>
    );
}

export default Team;
// Enjoy Coding