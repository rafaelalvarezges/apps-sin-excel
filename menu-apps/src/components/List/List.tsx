import * as React from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { initializeIcons } from '@uifabric/icons';
import {
  ActionButton,
  FontWeights,
  IButtonStyles,
  Icon,
  IIconStyles,
  Image,
  Persona,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
} from 'office-ui-fabric-react';
import styles from './List.module.scss';


const alertClicked = (): void => {
  alert('Clicked');
};

export class List extends React.Component<{}, {}> {
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
        backgroundImage: "url('/img/devs.png')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: 144,
      },
    };
    const backgroundImageCardSectionStylesClients: ICardSectionStyles = {
      root: {
        backgroundImage: "url('/img/clients.png')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: 144,
      },
    };


    const sectionStackTokens: IStackTokens = { childrenGap: 30 };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
    const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };

    return (
      <div className={styles.List}>
        <Stack horizontal tokens={sectionStackTokens}>

          <Card
            aria-label="Clickable vertical card with image bleeding at the top of the card"
            // onClick={alertClicked}
            onClick={()=>{window.open('http://10.132.0.14:3000/', '_blank');}}
            tokens={cardTokens}
          >
            <Card.Section
              fill
              verticalAlign="end"
              styles={backgroundImageCardSectionStylesClients}
              tokens={backgroundImageCardSectionTokens}
            >
              <span></span>
            </Card.Section>
            <Card.Section>
              <Text variant="small" styles={siteTextStyles}>
                Clientes
            </Text>
              <Text styles={descriptionTextStyles}>Aplicación de marketing para introducir código estadístico</Text>
            </Card.Section>

            <Card.Item grow={1}>
              <span />
            </Card.Item>

            <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
              {/* <Icon iconName="RedEye" styles={iconStyles} />
              <Icon iconName="OpenInNewTab" styles={iconStyles} /> */}
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <a href="http://10.132.0.14:3000/" target="_blank">
                <Icon iconName="OpenInNewTab" styles={iconStyles} />
              </a>
            </Card.Section>
          </Card>

          <Card
            aria-label="Clickable vertical card with image bleeding at the top of the card"
            // onClick={alertClicked}
            onClick={()=>{window.open('http://10.132.0.14:3000/', '_blank');}}
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
                Devoluciones
            </Text>
              <Text styles={descriptionTextStyles}>Aplicación de gestión de devoluciones</Text>
            </Card.Section>

            <Card.Item grow={1}>
              <span />
            </Card.Item>

            <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
              <Stack.Item grow={1}>
                <span />
              </Stack.Item>
              <a href="http://10.132.0.14:3000/" target="_blank">
                <Icon iconName="OpenInNewTab" styles={iconStyles} />
              </a>
            </Card.Section>
          </Card>
        </Stack>
      </div>
    );
  }
}