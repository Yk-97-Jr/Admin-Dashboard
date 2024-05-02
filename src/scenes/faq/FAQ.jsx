import React, { useState } from 'react'
import Header from '../../Components/Header'
import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from '@mui/material'
import { tokens } from '../../Theme'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQ = () => {
    const faqContents = [
        {
            question: 'Ask A question...', 
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla, quam quas laudantium quibusdam, maiores enim, totam asperiores veritatis blanditiis quidem dolore eveniet excepturi aut dolor alias. Fugiat rerum qui unde nostrum ipsam voluptatibus, perspiciatis atque, et, ratione delectus ullam. Libero accusamus laborum in illo unde omnis aut exercitationem aspernatur accusantium molestias odio, aliquid, ipsam obcaecati modi totam at. Id consequuntur, excepturi ut aut velit minus corporis ducimus vitae eaque officiis a modi optio, nostrum explicabo illum reprehenderit, culpa doloribus ullam laudantium quasi quae fugiat facilis laborum? Non aliquam labore accusantium laudantium fugiat doloremque a, repudiandae asperiores dicta reprehenderit. Tenetur.'
        },
        {
            question: 'Your favorite question...',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla, quam quas laudantium quibusdam, maiores enim, totam asperiores veritatis blanditiis quidem dolore eveniet excepturi aut dolor alias. Fugiat rerum qui unde nostrum ipsam voluptatibus, perspiciatis atque, et, ratione delectus ullam. Libero accusamus laborum in illo unde omnis aut exercitationem aspernatur accusantium molestias odio, aliquid, ipsam obcaecati modi totam at. Id consequuntur, excepturi ut aut velit minus corporis ducimus vitae eaque officiis a modi optio, nostrum explicabo illum reprehenderit, culpa doloribus ullam laudantium quasi quae fugiat facilis laborum? Non aliquam labore accusantium laudantium fugiat doloremque a, repudiandae asperiores dicta reprehenderit. Tenetur.',
        },
        {
            question: 'A random question...',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi delectus, sapiente voluptatem, expedita eaque iure libero fuga eligendi eius a voluptates temporibus iusto, dolores deleniti cupiditate quidem! Deleniti est excepturi asperiores, libero quisquam ullam nobis odio labore nesciunt minima facilis qui rem placeat quas tenetur sit itaque neque mollitia. Temporibus facilis consequuntur, atque assumenda saepe eius obcaecati, eveniet porro culpa beatae iusto optio earum odit commodi numquam dolor delectus ratione quis exercitationem sed velit tempora alias. Quidem laborum, perferendis voluptatem, excepturi repudiandae nostrum unde sed rem ut ipsa quam aliquid consectetur quia. Quis facilis doloribus eius vero optio suscipit exercitationem officiis possimus eum aspernatur repellendus nobis omnis tempore quia autem, sint non fuga magnam ea voluptatem velit praesentium ipsam necessitatibus recusandae! Aliquam assumenda, rem iusto quaerat, voluptatem ad hic veritatis mollitia incidunt quidem accusantium ipsa eum distinctio? Voluptas at dolores veritatis mollitia quo dicta, ipsa et consequuntur saepe nisi eaque tempore enim doloremque veniam quae soluta tenetur reprehenderit est blanditiis quod dolore, quas quasi temporibus fuga? Commodi odit nulla, consequuntur molestias dolorum sit ut quas laborum a at accusamus quis.',
        },
        {
            question: 'Some other questions...',
            answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo non, minus veniam sit totam similique facere error nisi aspernatur in cum tenetur voluptas quis, alias numquam culpa! Saepe, voluptatum enim! Minima, consequatur nemo recusandae nesciunt ipsam dicta rerum explicabo libero voluptas minus laboriosam illum vel architecto quibusdam, aliquid dolor. Neque soluta illo cum iure magnam itaque, quis delectus nam ipsa quas hic mollitia eligendi recusandae. Porro nobis non reprehenderit quas inventore assumenda repellendus harum distinctio, libero aut. Reiciendis facilis, praesentium numquam, ullam pariatur voluptatum delectus similique dolor ex deserunt quidem assumenda nesciunt quae beatae tenetur consectetur magni dicta, aliquam fuga porro maiores. Voluptate tenetur asperiores veritatis fugit natus dolorum voluptates minima aliquam illum sequi qui obcaecati error excepturi cupiditate, sed rerum officiis consequatur exercitationem dolorem maiores perspiciatis eum ullam facilis sapiente. Ratione reiciendis fugiat quam doloribus! Neque harum perspiciatis, blanditiis, minus omnis fugit nostrum veritatis, accusantium architecto esse totam quod autem fugiat. Provident dolor voluptates cumque fugiat impedit fuga nesciunt aliquam, neque adipisci sit? Praesentium eveniet corporis mollitia ipsum rerum corrupti voluptate provident, alias in voluptatibus deleniti illum nihil necessitatibus, atque magnam et iusto fuga aliquam expedita ut similique deserunt sint. Perferendis officia, nesciunt numquam nihil aperiam alias delectus. Error ratione natus, nisi accusamus, amet reiciendis iure suscipit quos optio esse laudantium obcaecati quod minima sit eligendi omnis beatae nostrum repellat consequuntur autem, hic impedit odit fuga sint. Voluptas quam officia soluta tempore id nam accusantium velit eligendi iusto voluptatum.',
        },
        {
            question: 'One more question...',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quis odio eos voluptates possimus ex sequi cupiditate et illo laudantium aspernatur voluptatibus, repellat officia. Eius, quibusdam voluptates? Quibusdam temporibus esse quidem suscipit debitis recusandae, pariatur placeat voluptates deleniti incidunt tenetur dicta soluta exercitationem blanditiis error magni illo! Exercitationem, neque tempora? Saepe molestiae blanditiis iste unde quod voluptatum, odit corrupti eaque odio aliquam ratione porro, pariatur optio. Omnis eveniet eos nesciunt repudiandae modi dolorem quaerat officia ea nostrum molestias inventore aliquid facilis libero, ipsum esse a quia beatae officiis tenetur aliquam consectetur eligendi, neque enim? Eius molestias earum voluptatem fuga voluptatibus ab doloremque pariatur, magnam, saepe facere in rerum, nesciunt explicabo aperiam assumenda consequuntur maiores recusandae natus! Incidunt officiis rerum dolorum consequuntur deleniti tempore architecto? Fugiat, est. Perspiciatis vitae autem, exercitationem, repellat iste cum ad distinctio mollitia accusamus obcaecati voluptates vel ea quam, libero porro atque doloremque deleniti numquam consequatur omnis reiciendis eaque. Libero totam iusto optio odit suscipit eos maxime, dolore laborum placeat ut quasi at doloribus aperiam dicta atque id harum facere labore, animi dignissimos voluptatem dolorem, aliquam corporis. Perspiciatis perferendis quibusdam officia voluptate alias odit laboriosam. Ipsum ullam minus excepturi illo omnis nulla, optio inventore aliquid consectetur quibusdam expedita aut tempore mollitia aperiam sequi nisi, officia enim corrupti eos in, quidem provident sed doloremque? Nemo dolore soluta porro quae voluptate, quos aliquam qui perferendis est provident similique cumque sit, rem ex, aperiam quia. Deserunt, sed quaerat! Nemo placeat soluta, alias quod sint dolor nesciunt magni exercitationem facilis facere expedita? Magni ratione suscipit quidem corporis ullam quam cupiditate odit amet? Laborum libero totam est impedit eum quia vitae delectus unde numquam beatae sit labore sunt, perferendis eius? Voluptatem, sapiente. Asperiores nemo ratione molestiae voluptates ad quisquam vero magni, in culpa hic impedit repellendus sit suscipit, a, nesciunt itaque id.',
        },
        {
            question: 'Ask a few more questions...',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi inventore nisi deserunt est ipsa possimus, recusandae ad! Non dolorem error, unde laboriosam laudantium animi veritatis dolores repellendus, a ipsum tenetur vel aliquam eaque fugit eveniet distinctio atque quasi voluptatem? Quibusdam, earum dicta! Quod modi ex dolorem cumque blanditiis laudantium quis adipisci consequatur, quisquam tenetur obcaecati eius numquam, nam optio laboriosam veniam, fugit totam ad dolores nobis animi quibusdam. Necessitatibus deserunt itaque possimus maxime illo vel cumque quas minima repellendus natus ut, repudiandae libero doloremque assumenda laboriosam reprehenderit tempora, nemo dolore atque. Repellendus ex numquam, impedit laborum cupiditate porro id, voluptate nostrum qui, consectetur exercitationem excepturi nemo soluta architecto in amet incidunt illo perspiciatis beatae quam! Optio molestias enim sunt dicta, exercitationem itaque totam dolorum odit sit. Eius, voluptates fugiat adipisci deserunt nesciunt, alias magni officiis quaerat eaque qui tempora ea, similique delectus. Ad sed possimus magni distinctio cumque voluptas, voluptatum soluta excepturi consequatur provident temporibus! Molestias excepturi eum dignissimos impedit, eius dolor, maiores animi ipsa neque accusamus minima quasi commodi, unde at sapiente quod mollitia aperiam tempore nulla nemo? Asperiores excepturi odit minus necessitatibus sint accusamus fugiat laborum consequuntur sapiente nobis beatae rem vel dolores repellat perspiciatis ratione, labore maiores impedit. Eius asperiores expedita vero, commodi adipisci tempora ex quibusdam.',
        },
        {
            question: 'One last question...',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eius voluptatibus pariatur amet, sequi quasi voluptatem, temporibus tenetur quam porro, culpa eaque doloribus iusto error maxime totam consectetur! Earum eligendi modi, perferendis, quae beatae perspiciatis vitae suscipit aspernatur ipsa consequatur eos laudantium dolor? Voluptas, minus unde, rem facilis saepe eaque ipsa, ut animi alias nostrum maxime laudantium sint? Quia et a tempore itaque voluptates officiis aperiam asperiores reiciendis repellat odio, suscipit qui perferendis, incidunt at accusamus eum tempora accusantium nobis ipsum blanditiis sint, rem corporis nesciunt. Quisquam culpa error incidunt molestiae ex, aliquid, et optio fugit vel ea, dolores totam. Commodi adipisci consectetur nulla incidunt amet esse dolorum odio perferendis blanditiis voluptatem! Aspernatur quis sapiente, eaque libero necessitatibus maiores? Reiciendis reprehenderit quisquam earum minima, itaque aliquam consequatur fugit quaerat maxime unde commodi impedit, corrupti doloribus et est. Consequuntur cum modi fugiat voluptates animi! Unde corrupti nemo adipisci commodi aspernatur nostrum!,'
        },
    ]

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [expanded, setExpanded] = useState(null);

    const handleChange = (index) => (event, isExpanded) => {
        console.log(index, isExpanded);
        setExpanded(isExpanded ? index : null);
    };
    return (
        <div className='ml-2 mt-5'>
            <Header title={'FAQ section'} subtitle={'Happy to help you....'}/>

            <div className='w-full mt-8 flex items-center justify-center'>
                <div className='w-[97%] max-h-[46rem] overflow-y-auto scrollbar-none flex justify-center rounded-lg overflow-hidden'>
                    <div className='w-full space-y-3'>
                        {faqContents.map((item, index) => (
                            <Accordion 
                            key={index} 
                            expanded={expanded === index}
                            onChange={handleChange(index)}
                            sx={{backgroundColor: colors.primary[400]}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography variant='h4' color={colors.greenAccent[400]}>
                                        {item.question}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails 
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    textAlign: 'justify',
                                }}>
                                    <Typography variant='h6'>
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ