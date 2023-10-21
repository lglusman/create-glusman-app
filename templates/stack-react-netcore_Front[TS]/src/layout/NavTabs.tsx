import { Box, Tabs } from "@mui/material";
import { LinkTab } from "./LinkTab";
import { useState } from "react";

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

type tablink = {
  label: string;
  to: string;
}
type navs = {
  navs: tablink[];
}


export default function NavTabs({navs}: navs) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        {
          navs.map((tablink, index) => (
            <LinkTab key={index} label={tablink.label} to={tablink.to} />
          ))
        }
      </Tabs>
    </Box>
  );
}