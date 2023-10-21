import { Tab } from '@mui/material'
import { Link } from 'react-router-dom';

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label: string;
  to: string;
}

export function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={Link}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          //event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

