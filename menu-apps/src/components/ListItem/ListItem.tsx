import * as React from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { initializeIcons } from '@uifabric/icons';
import {
  FontWeights,
  Icon,
  IIconStyles,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
} from 'office-ui-fabric-react';
import styles from './ListItem.module.scss';


export interface IListItem{
    url:string;
    imgUrl:string;
    title:string;
    description:string;
}

export default class ListItem extends React.Component<IListItem, {}> {
  public render(): JSX.Element {
    initializeIcons();
    const siteTextStyles: ITextStyles = {
      root: {
        color: '#025F52',
        fontWeight: FontWeights.semibold,
      },
    };
    const descriptionTextStyles: ITextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.semibold,
      },
    };
    const iconStyles: IIconStyles = {
      root: {
        color: '#0078D4',
        fontSize: 16,
        fontWeight: FontWeights.regular,
      },
    };
    const footerCardSectionStyles: ICardSectionStyles = {
      root: {
        borderTop: '1px solid #F3F2F1',
      },
    };
    const backgroundImageCardSectionStyles: ICardSectionStyles = {
      root: {
        backgroundImage: "url('" + this.props.imgUrl + "')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: 144,
      },
    };
    
    const sectionStackTokens: IStackTokens = { childrenGap: 30 };
    const cardTokens: ICardTokens = { childrenMargin: 12};
    const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
    const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };

    return (
      <div className={styles.ListItem}>
        <Stack horizontal tokens={sectionStackTokens}>

          <Card
            aria-label="Clickable vertical card with image bleeding at the top of the card"
            onClick={()=>{window.open(this.props.url, '_blank');}}
            tokens={cardTokens}
          >
            <Card.Section
              fill
              verticalAlign="end"
              styles={backgroundImageCardSectionStyles}
              tokens={backgroundImageCardSectionTokens}
            >
              <span></span>
            </Card.Section>
            <Card.Section>
              <Text variant="small" styles={siteTextStyles}>
                {this.props.title}
            </Text>
              <Text styles={descriptionTextStyles}>{this.props.description}</Text>
            </Card.Section>

            <Card.Item grow={1}>
              <span />
            </Card.Item>

            <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <a href={this.props.url} target="_blank">
                <Icon iconName="OpenInNewTab" styles={iconStyles} />
              </a>
            </Card.Section>
          </Card>

        </Stack>
      </div>
    );
  }
}