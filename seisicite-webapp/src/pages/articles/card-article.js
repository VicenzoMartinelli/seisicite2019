import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '../../components/Badge/Badge';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function CardArticle({ title, resume, primaryAuthor, submissionId, modality, startDate, onEditClick }) {

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345,
      minHeight: 290,
      margin: 'auto'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#000',
    },
    resume: {
      fontSize: '.5rem'
    },
    MuiCardHeader: {
      root: {
        padding: '1px'
      }
    }
  }));

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  console.log(primaryAuthor, modality)
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {primaryAuthor.firstName[0] + (primaryAuthor.lastName && primaryAuthor.lastName[0])}
          </Avatar>
        }
        title={primaryAuthor.fullName}
        subheader={`${startDate} - ${modality}`}
        style={{ padding: '12px 20px' }}
      />
      <CardContent
        style={{ padding: '0px 20px', 'min-height': 133 }}
      >
        <Badge color="primary">{submissionId}</Badge>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '5px' }} component="p">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onEditClick}>
          <CreateIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Resumo:</Typography>
          <Typography paragraph align={'justify'} color={'textSecondary'} className={classes.resume}>{resume}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}